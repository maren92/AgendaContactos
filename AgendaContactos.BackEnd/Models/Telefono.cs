using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agenda.BackEnd.Models
{
    public class Telefono
    {
        public int Id { get; set; }
        public string Numero { get; set; }
        public Contacto Contacto { get; set; }
        public int ContactoId { get; set; }
    }
}
