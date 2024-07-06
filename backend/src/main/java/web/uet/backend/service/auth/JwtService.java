package web.uet.backend.service.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import web.uet.backend.entity.auth.UserAuthentication;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

@Service
public class JwtService {
  @Value("${token.signing.key}")
  private String jwtSigningKey;

  public static int EXPIRED_TIME = 1000 * 60 * 24;

  public UUID extractAccountID(String token) {
    return UUID.fromString(extractClaim(token, Claims::getSubject));
  }

  public String generateToken(UserAuthentication userAuthentication) {
    return generateToken(new HashMap<>(), userAuthentication);
  }


  private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
    final Claims claims = extractAllClaims(token);
    return claimsResolvers.apply(claims);
  }

  private String generateToken(Map<String, Object> extraClaims, UserAuthentication userAuthentication) {
    return Jwts.builder()
        .setClaims(extraClaims)
        .setSubject(userAuthentication.getAccount().getAccountId().toString())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRED_TIME))
        .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
  }

  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  private Claims extractAllClaims(String token) {
    return Jwts
        .parserBuilder()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody();
  }

  private Key getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(jwtSigningKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}
