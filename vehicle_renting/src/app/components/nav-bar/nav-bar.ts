import { Component, ElementRef, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  menuButtons = viewChild<ElementRef>('txtMenuBtn');
  mobileMenus = viewChild<ElementRef>('txtMobileMenu');

  toggleMenu() {
    const menuBtn = this.menuButtons()?.nativeElement;
    const mobileMenu = this.mobileMenus()?.nativeElement;

    if (menuBtn && mobileMenu) {
      menuBtn?.classList.toggle('active');
      mobileMenu?.classList.toggle('hidden');
    } else {
      console.error('Menu button or mobile menu element not found.');
    }
  }
}
