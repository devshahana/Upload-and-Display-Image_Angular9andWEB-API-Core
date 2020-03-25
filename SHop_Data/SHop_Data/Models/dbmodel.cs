using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SHop_Data.Models
{
    public class dbmodel : IdentityDbContext
    {
        public dbmodel(DbContextOptions<dbmodel> option) : base(option)
        {

        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    }
    public class Employee
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string caption { get; set; }
        public string Image { get; set; }
    }
    public class ApplicationUser : IdentityUser
    {
        public string Fullname { get; set; }

    }
    public class ApplicationUserModel
    {
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }



    }
    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }

    }


}
