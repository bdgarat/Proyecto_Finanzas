package com.back.finanzas.app.Controladores;

import com.back.finanzas.app.Modelos.Usuario;
import com.back.finanzas.app.Servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;
    @GetMapping
    @ResponseBody
    public List<Usuario> listarUsuarios()
    {
        return usuarioService.listarUsuarios();
    }
    @PostMapping
    public ResponseEntity<String> agregarUsuario(@RequestBody Usuario usuario)
    {
        return usuarioService.agregarUsuario(usuario);
    }
    @PutMapping
    public ResponseEntity<String> editarUsuario(@RequestBody Usuario usuario)
    {
        return usuarioService.editarUsuario(usuario);
    }
    @DeleteMapping
    public ResponseEntity<String> eliminarUsuario(@RequestHeader Integer id)
    {
        return usuarioService.eliminarUsuario(id);
    }
}
