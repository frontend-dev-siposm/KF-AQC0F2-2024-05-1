using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using TrelloCopy.Data;
using TrelloCopy.Data;
using TrelloCopy.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();


builder.Services.AddTransient<TrelloCopy.Helpers.TableBuilder>();

builder.Services.AddSingleton<ITaskRepository, TaskRepository>();
builder.Services.AddSingleton<IProjectRepository, ProjectRepository>();
builder.Services.AddSingleton<ApplicationLiteDbContext>(new ApplicationLiteDbContext("Filename=MyData.db;Mode=Exclusive"));

// Register repositories


builder.Services.AddDefaultIdentity<SiteUser>(options =>
{
    options.SignIn.RequireConfirmedAccount = true;
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
})
    .AddEntityFrameworkStores<ApplicationDbContext>();


builder.Services.AddAuthentication().AddFacebook(opt => 
{
    opt.AppId = "1971267486638744";
    opt.AppSecret = "d44193a1ecda33ce3e78d653b7990924";
});


builder.Services.AddTransient<IEmailSender, EmailSender>();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
