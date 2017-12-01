using Agenda.BackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgendaContactos.BackEnd.Models
{
    public class ContactoCompleto
    {
        public Contacto Contacto { get; set; }
        public List<Telefono> Telefonos { get; set; }
        public List<Grupo> Grupos { get; set; }
    }
}
