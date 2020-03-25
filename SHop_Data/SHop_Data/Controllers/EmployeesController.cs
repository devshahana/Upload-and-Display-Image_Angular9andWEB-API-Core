using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SHop_Data.Models;

namespace SHop_Data.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly dbmodel _context;
        private readonly IHostingEnvironment _env;

        public EmployeesController(dbmodel context,IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            this._env = hostingEnvironment;
        }

        // GET: api/Employees
        [HttpGet]
        public IEnumerable<Employee> GetEmployees()
        {
            return _context.Employees;
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee([FromRoute] int id, [FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.Id)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employees
        [HttpPost]
        public  IActionResult PostEmployee()
        {
            try
            {
                var httpreq = HttpContext.Request.Body;
                var c = Request.Form["caption"].ToString();
                var file = Request.Form.Files[0];
                string rootPtah = Path.Combine(this._env.WebRootPath, "EmployeeImage");

                if (!Directory.Exists(rootPtah))
                {
                    Directory.CreateDirectory(rootPtah);
                }
                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string ext = Path.GetExtension(fileName);
                    string filewithoutext = Path.GetFileNameWithoutExtension(fileName);
                    string filepath = Path.Combine(rootPtah, (filewithoutext+"_"+ c +ext));
                    using (var stream = new FileStream(filepath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    string imagePath = "/EmployeeImage/" + filewithoutext+ "_" + c + ext;
                    var emp = new Employee
                    {
                        caption = c,
                         Image=imagePath,
                         name=c
                    };
                    _context.Employees.Add(emp);
                    if(_context.SaveChanges()>0)
                    {
                        return Created("api/Employees", emp);
                    }
                }
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(new { resul="Successfuly created"});
        }
        //public async Task<IActionResult> PostEmployee([FromBody] Employee employee)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    _context.Employees.Add(employee);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        //}

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok(employee);
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}