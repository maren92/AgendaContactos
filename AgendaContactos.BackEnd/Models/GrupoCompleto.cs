using Agenda.BackEnd.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgendaContactos.BackEnd.Models
{
    public class GrupoCompleto
    {
        public Grupo Grupo { get; set; }
        public List<Contacto> Contactos { get; set; }
    }
}
