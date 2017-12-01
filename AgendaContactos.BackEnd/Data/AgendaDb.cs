using Agenda.BackEnd.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgendaContactos.BackEnd.Data
{
    public class AgendaDb : DbContext
    {
        public AgendaDb(DbContextOptions<AgendaDb> options)
            : base(options)
        {
        }

        public DbSet<Contacto> Contactos { get; set; }
        public DbSet<Grupo> Grupos { get; set; }
        public DbSet<GrupoContactos> GruposContactos { get; set; }
        public DbSet<Telefono> Telefonos { get; set; }
        public object Contacto { get; internal set; }
    }
}
