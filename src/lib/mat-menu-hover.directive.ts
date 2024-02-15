import { DestroyRef, Directive, EventEmitter, HostListener, Input, OnInit, Output, Self, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, filter, fromEvent, mergeMap, tap } from 'rxjs';

/**
 * Directive to handle hover menu behavior.
 */
@Directive({
  selector: '[matHoverMenu]',
  standalone: true
})
export class MatMenuHoverDirective implements OnInit {
  private destroyRef = inject(DestroyRef);
  private menu: MatMenuPanel<any>; // Reference to the MatMenuPanel
  private menuElement$ = new BehaviorSubject<HTMLDivElement>(null); // Observable for menu element
  private closer: any;

  /**
  * Delay (in milliseconds) before closing the menu after mouseleave.
  */
  @Input() closeDelay = 50; // Delay before closing the menu on mouseleave

  /**
 * Event emitter for notifying when the menu is opened.
 */
  @Output() opened = new EventEmitter<boolean>();

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.openMenu();

    // Get the menu element by ID and emit it to the observable
    const element = document.querySelector(`#${this.menu.panelId}`) as HTMLDivElement;
    if (element) {
      this.menuElement$.next(element);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.closeMenu();
  }

  constructor(@Self() private matMenuTrigger: MatMenuTrigger) { }

  ngOnInit(): void {
    // Ensure MatMenuTrigger is present
    if (!this.matMenuTrigger) {
      console.error('There must be a MatMenuTrigger present.');
      return;
    }

    // Assign the menu and disable backdrop
    this.menu = this.matMenuTrigger.menu;
    this.menu.hasBackdrop = false;

    // Subscribe to mouseleave event on the menu element to close the menu
    this.menuElement$.pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(element => !!element),
      mergeMap(element => fromEvent(element, 'mouseleave')),
      tap(() => this.closeMenu())
    )
      .subscribe();

    // Subscribe to mouseenter event on the menu element to open the menu
    this.menuElement$.pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(element => !!element),
      mergeMap(element => fromEvent(element, 'mouseenter')),
      tap(() => this.openMenu())
    )
      .subscribe();
  }

  private closeMenu(): void {
    this.closer = setTimeout(() => {
      this.matMenuTrigger.closeMenu();
    }, this.closeDelay);
  }

  private openMenu(): void {
    if (this.closer) {
      clearTimeout(this.closer);
    }

    this.matMenuTrigger.openMenu();
  }
}

