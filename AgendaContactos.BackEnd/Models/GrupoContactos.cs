using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agenda.BackEnd.Models
{
    public class GrupoContactos
    {
        public int Id { get; set; }
        public Contacto Contacto { get; set; }
        public int ContactoId { get; set; }
        public Grupo Grupo { get; set; }
        public int GrupoId { get; set; }
    }
}
