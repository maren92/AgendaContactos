using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Agenda.BackEnd.Models;
using AgendaContactos.BackEnd.Data;
using AgendaContactos.BackEnd.Models;
using Microsoft.AspNetCore.Cors;

namespace AgendaContactos.BackEnd.Controllers
{
    [Produces("application/json")]
    [Route("api/Grupoes")]
    [EnableCors("AllowAllOrigins")]
    public class GrupoesController : Controller
    {
        private readonly AgendaDb _context;

        public GrupoesController(AgendaDb context)
        {
            _context = context;
        }

        // GET: api/Grupoes
        [HttpGet]
        public IEnumerable<Grupo> GetGrupos()
        {
            var grupos = _context.Grupos;
            foreach (var grupo in grupos)
            {
                grupo.GrupoContactos =
                    _context.GruposContactos.Include(gc => gc.Contacto).Where(gc => gc.GrupoId == grupo.Id).Select(gc =>
                        new GrupoContactos { Id = gc.Id, GrupoId = gc.GrupoId, ContactoId = gc.ContactoId, Contacto = gc.Contacto }).ToList();
            }
            return grupos;
        }

        // GET: api/Grupoes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGrupo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var grupo = await _context.Grupos.SingleOrDefaultAsync(m => m.Id == id);

            if (grupo == null)
            {
                return NotFound();
            }

            grupo.GrupoContactos =
                _context.GruposContactos.Include(gc => gc.Contacto).Where(gc => gc.GrupoId == grupo.Id).Select(gc =>
                    new GrupoContactos { Id = gc.Id, GrupoId = gc.GrupoId, ContactoId = gc.ContactoId, Contacto = gc.Contacto }).ToList();
            
            return Ok(grupo);
        }

        // PUT: api/Grupoes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGrupo([FromRoute] int id, [FromBody] GrupoCompleto grupo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != grupo.Grupo.Id)
            {
                return BadRequest();
            }

            foreach (var contacto in grupo.Contactos)
            {
                var grct = _context.GruposContactos.FirstOrDefault(gr => gr.GrupoId == id && gr.ContactoId == contacto.Id);
                if (null == grct)
                {
                    var gc = new GrupoContactos
                    {
                        GrupoId = grupo.Grupo.Id,
                        ContactoId = contacto.Id
                    };
                    _context.GruposContactos.Add(gc);
                }
            }

            var grcts = _context.GruposContactos.Where(gc => gc.GrupoId == id && grupo.Contactos.All(g => g.Id != gc.ContactoId));
            foreach (var grct in grcts)
            {
                _context.GruposContactos.Remove(grct);
            }

            _context.Entry(grupo.Grupo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GrupoExists(id))
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

        // POST: api/Grupoes
        [HttpPost]
        public async Task<IActionResult> PostGrupo([FromBody] GrupoCompleto grupoc)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Grupos.Add(grupoc.Grupo);
            await _context.SaveChangesAsync();
            

            foreach (var contacto in grupoc.Contactos)
            {
                var gc = new GrupoContactos()
                {
                    GrupoId = grupoc.Grupo.Id,
                    ContactoId = contacto.Id
                };
                _context.GruposContactos.Add(gc);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Grupoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrupo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var grupo = await _context.Grupos.SingleOrDefaultAsync(m => m.Id == id);
            if (grupo == null)
            {
                return NotFound();
            }

            _context.Grupos.Remove(grupo);
            await _context.SaveChangesAsync();

            return Ok(grupo);
        }

        private bool GrupoExists(int id)
        {
            return _context.Grupos.Any(e => e.Id == id);
        }
    }
}