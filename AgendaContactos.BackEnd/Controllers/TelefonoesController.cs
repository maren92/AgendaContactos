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

namespace AgendaContactos.BackEnd.Controllers
{
    [Produces("application/json")]
    [Route("api/Telefonoes")]
    [EnableCors("AllowAllOrigins")]
    public class TelefonoesController : Controller
    {
        private readonly AgendaDb _context;

        public TelefonoesController(AgendaDb context)
        {
            _context = context;
        }

        // GET: api/Telefonoes
        [HttpGet]
        public IEnumerable<Telefono> GetTelefonos()
        {
            return _context.Telefonos;
        }

        // GET: api/Telefonoes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTelefono([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var telefono = await _context.Telefonos.SingleOrDefaultAsync(m => m.Id == id);

            if (telefono == null)
            {
                return NotFound();
            }

            return Ok(telefono);
        }
        // GET: api/Telefonoes/contacto/5
        //[HttpGet("contacto/{id}")]
        //public async Task<IActionResult> GetTelefonoDeContacto([FromRoute] int contacto,[FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var minumero =await from telefono in _context.Telefonos
        //                   join persona in _context.Contacto
        //                   on telefono.ContactoId equals persona.id
        //                   where persona.id == id select telefono.numero;
        //    //_context.Telefonos.Where(t => t.ContactoId == id).Select(t => t.Numero).ToList()
        //    if (minumero == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(minumero);
        //}

        // PUT: api/Telefonoes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTelefono([FromRoute] int id, [FromBody] Telefono telefono)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != telefono.Id)
            {
                return BadRequest();
            }

            _context.Entry(telefono).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TelefonoExists(id))
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

        // POST: api/Telefonoes
        [HttpPost]
        public async Task<IActionResult> PostTelefono([FromBody] Telefono telefono)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Telefonos.Add(telefono);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTelefono", new { id = telefono.Id }, telefono);
        }

        // DELETE: api/Telefonoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTelefono([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var telefono = await _context.Telefonos.SingleOrDefaultAsync(m => m.Id == id);
            if (telefono == null)
            {
                return NotFound();
            }

            _context.Telefonos.Remove(telefono);
            await _context.SaveChangesAsync();

            return Ok(telefono);
        }

        private bool TelefonoExists(int id)
        {
            return _context.Telefonos.Any(e => e.Id == id);
        }
    }
}