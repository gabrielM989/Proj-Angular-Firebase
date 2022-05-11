import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutorizacaoService } from '../funcionario/services/autorizacao.service';

@Injectable({
  providedIn: 'root'
})
export class AutorizadoGuard implements CanActivate {

  constructor(

    private autorizado: AutorizacaoService,
    private router: Router

  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const usuarioLogado = this.autorizado.obterStatusLogin() //Irá retornar True, se estiver logado e False, senão estiver
    
    if (usuarioLogado) return usuarioLogado // Se o IF der falso, ele irá fazer o THIS.ROUTER.NAVIGATE

    this.router.navigate(['/'])
    return true;
  }
  
}
