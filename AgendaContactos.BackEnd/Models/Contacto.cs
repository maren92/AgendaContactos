using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agenda.BackEnd.Models
{
    public class Contacto
    {
        public Contacto()
        {
            Telefonos = new HashSet<Telefono>();
        }
        public int Id { get; set; }
        public string NombreApe { get; set; }
        public string Correo { get; set; }
        public string Alias { get; set; }
        public string Direccion { get; set; }
        public ICollection<Telefono> Telefonos { get; set; }
        public ICollection<GrupoContactos> GrupoContactos { get; set; }
    }
}
