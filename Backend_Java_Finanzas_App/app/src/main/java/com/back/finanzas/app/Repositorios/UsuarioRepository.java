package com.back.finanzas.app.Repositorios;

import com.back.finanzas.app.Modelos.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNullApi;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario,Integer> {
    @Override
    Optional<Usuario> findById(Integer id);
    Optional<Usuario> findByUsername(String username);
    Optional<Usuario> findByEmail(String email);
}
