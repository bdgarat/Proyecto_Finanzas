package com.back.finanzas.app.Servicios;

import com.back.finanzas.app.Modelos.Usuario;
import com.back.finanzas.app.Repositorios.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    public List<Usuario> listarUsuarios()
    {
        return usuarioRepository.findAll();
    }
    public ResponseEntity<String> agregarUsuario(Usuario usuario)
    {
        if (chequeoDatosCompletos(usuario)){
            usuarioRepository.save(usuario);
          return  ResponseEntity.ok().body("Usuario creado correctamente");
        }
        else{
            return ResponseEntity.badRequest()
                    .body("Los datos son incompletos. Es necesario agregar todos los campos que son parte de un usuario");
        }
    }
    public ResponseEntity<String> editarUsuario(Usuario usuario)
    {
        Optional<Usuario> usuario1 = usuarioRepository.findById(usuario.getId());
        if(usuario1.isEmpty())
        {
            return  ResponseEntity.notFound().build();
        }
        else
        {
            usuarioRepository.save(usuario);
            return ResponseEntity.ok().body("Usuario editado correctamente");
        }
    }
    public ResponseEntity<String> eliminarUsuario (Integer id)
    {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        if(usuario.isEmpty())
        {
            return ResponseEntity.notFound().build();
        }
        else {
            usuarioRepository.delete(usuario.get());
            return ResponseEntity.ok().body("Usuario eliminado correctamente");
        }
    }
    private boolean chequeoDatosCompletos(Usuario usuario)
    {
        return !usuario.getUsername().isEmpty() && !usuario.getLastname().isEmpty() && !usuario.getEmail().isEmpty()
                && !usuario.getPassword().isEmpty();
    }
}
