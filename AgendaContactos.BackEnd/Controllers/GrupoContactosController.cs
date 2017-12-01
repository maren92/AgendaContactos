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
    [Route("api/GrupoContactos")]
    [EnableCors("AllowAllOrigins")]
    public class GrupoContactosController : Controller
    {
        private readonly AgendaDb _context;

        public GrupoContactosController(AgendaDb context)
        {
            _context = context;
        }

        // GET: api/GrupoContactos
        [HttpGet]
        public IEnumerable<GrupoContactos> GetGruposContactos()
        {
            return _context.GruposContactos;
        }

        // GET: api/GrupoContactos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGrupoContactos([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var grupoContactos = await _context.GruposContactos.SingleOrDefaultAsync(m => m.Id == id);

            if (grupoContactos == null)
            {
                return NotFound();
            }

            return Ok(grupoContactos);
        }

        // PUT: api/GrupoContactos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGrupoContactos([FromRoute] int id, [FromBody] GrupoContactos grupoContactos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != grupoContactos.Id)
            {
                return BadRequest();
            }

            _context.Entry(grupoContactos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GrupoContactosExists(id))
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

        // POST: api/GrupoContactos
        [HttpPost]
        public async Task<IActionResult> PostGrupoContactos([FromBody] GrupoContactos grupoContactos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.GruposContactos.Add(grupoContactos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGrupoContactos", new { id = grupoContactos.Id }, grupoContactos);
        }

        // DELETE: api/GrupoContactos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrupoContactos([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var grupoContactos = await _context.GruposContactos.SingleOrDefaultAsync(m => m.Id == id);
            if (grupoContactos == null)
            {
                return NotFound();
            }

            _context.GruposContactos.Remove(grupoContactos);
            await _context.SaveChangesAsync();

            return Ok(grupoContactos);
        }

        private bool GrupoContactosExists(int id)
        {
            return _context.GruposContactos.Any(e => e.Id == id);
        }
    }
}