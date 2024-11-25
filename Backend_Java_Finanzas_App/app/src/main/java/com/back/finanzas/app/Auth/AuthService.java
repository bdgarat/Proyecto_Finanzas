package com.back.finanzas.app.Auth;

import com.back.finanzas.app.Jwt.JwtService;
import com.back.finanzas.app.Modelos.Usuario;
import com.back.finanzas.app.Repositorios.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public AuthResponse login(LoginRequest request)
    {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword()));
            UserDetails userDetails = usuarioRepository.findByUsername(request.getUsername()).orElseThrow();
            String token = jwtService.getToken(userDetails);
            return AuthResponse.builder()
                    .token(token)
                    .mensaje("Credenciales correctas")
                    .build();
        }catch(Exception e)
        {
            return AuthResponse.builder().mensaje("Credenciales incorrectas").build();
        }

    }
    public AuthResponse register(RegisterRequest request)
    {
        if(!verifyRepeatEmail(request.getEmail())){
            Usuario user =  new Usuario();
            user.setUsername(request.getUsername());
            user.setLastname(request.getLastname());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            usuarioRepository.save(user);
            return AuthResponse.builder().mensaje("Usuario creado con exito").build();
        }else
            return AuthResponse.builder().token("").mensaje("Ya hay un usuario con este email").build();

    }
private boolean verifyRepeatEmail(String email){
        Optional<Usuario> user = usuarioRepository.findByEmail(email);
        return (user.isPresent());

}
}
