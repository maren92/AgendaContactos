using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Agenda.BackEnd.Models;
using AgendaContactos.BackEnd.Data;
using Microsoft.AspNetCore.Cors;
using AgendaContactos.BackEnd.Models;

namespace AgendaContactos.BackEnd.Controllers
{
    [Produces("application/json")]
    [Route("api/Contactoes")]
    [EnableCors("AllowAllOrigins")]
    public class ContactoesController : Controller
    {
        private readonly AgendaDb _context;

        public ContactoesController(AgendaDb context)
        {
            _context = context;
        }

        // GET: api/Contactoes
        [HttpGet]
        public IEnumerable<Contacto> GetContactos()
        {
            var contactos = _context.Contactos;
            foreach (var contacto in contactos)
            {
                contacto.Telefonos =
                    _context.Telefonos.Where(t => t.ContactoId == contacto.Id).Select(t =>
                        new Telefono {Id = t.Id, Numero = t.Numero, ContactoId = t.ContactoId}).ToList();
                contacto.GrupoContactos =
                    _context.GruposContactos.Include(gc => gc.Grupo).Where(gc => gc.ContactoId == contacto.Id).Select(gc =>
                        new GrupoContactos { Id = gc.Id, ContactoId = gc.ContactoId, GrupoId = gc.GrupoId, Grupo = gc.Grupo}).ToList();
            }
            return contactos;
        }

        // GET: api/Contactoes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetContacto([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var contacto = await _context.Contactos.SingleOrDefaultAsync(m => m.Id == id);

            if (contacto == null)
            {
                return NotFound();
            }

            contacto.Telefonos =
                _context.Telefonos.Where(t => t.ContactoId == contacto.Id).Select(t =>
                    new Telefono { Id = t.Id, Numero = t.Numero, ContactoId = t.ContactoId }).ToList();

            contacto.GrupoContactos =
                _context.GruposContactos.Include(gc => gc.Grupo).Where(gc => gc.ContactoId == contacto.Id).Select(gc =>
                    new GrupoContactos { Id = gc.Id, ContactoId = gc.ContactoId, GrupoId = gc.GrupoId, Grupo = gc.Grupo }).ToList();

            return Ok(contacto);
        }

        // PUT: api/Contactoes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContacto([FromRoute] int id, [FromBody] ContactoCompleto contacto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contacto.Contacto.Id)
            {
                return BadRequest();
            }

            foreach (var telefono in contacto.Telefonos)
            {
                telefono.ContactoId = id;
                if (telefono.Id == 0)
                {
                    _context.Telefonos.Add(telefono);
                }
                else
                {
                    _context.Entry(telefono).State = EntityState.Modified;
                }
            }

            foreach (var grupo in contacto.Grupos)
            {
                var grct = _context.GruposContactos.FirstOrDefault(gr => gr.ContactoId == id && gr.GrupoId == grupo.Id);
                if (null == grct)
                {
                    var gc = new GrupoContactos
                    {
                        ContactoId = contacto.Contacto.Id,
                        GrupoId = grupo.Id
                    };
                    _context.GruposContactos.Add(gc);
                }
            }

            var grcts = _context.GruposContactos.Where(gc => gc.ContactoId == id && contacto.Grupos.All(g => g.Id != gc.GrupoId));
            foreach (var grct in grcts)
            {
                _context.GruposContactos.Remove(grct);
            }

            _context.Entry(contacto.Contacto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactoExists(id))
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

        // POST: api/Contactoes
        [HttpPost]
        public async Task<IActionResult> PostContacto([FromBody] ContactoCompleto contacto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Contactos.Add(contacto.Contacto);
            await _context.SaveChangesAsync();

            foreach (var telefono in contacto.Telefonos)
            {
                telefono.ContactoId = contacto.Contacto.Id;
                _context.Telefonos.Add(telefono);
            }

            foreach (var grupo in contacto.Grupos)
            {
                var gc = new GrupoContactos
                {
                    ContactoId = contacto.Contacto.Id,
                    GrupoId = grupo.Id
                };
                _context.GruposContactos.Add(gc);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Contactoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContacto([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var contacto = await _context.Contactos.SingleOrDefaultAsync(m => m.Id == id);
            if (contacto == null)
            {
                return NotFound();
            }

            _context.Contactos.Remove(contacto);
            await _context.SaveChangesAsync();

            return Ok(contacto);
        }

        private bool ContactoExists(int id)
        {
            return _context.Contactos.Any(e => e.Id == id);
        }
    }
}