# mat-menu-hover - An Angular Material directive
This Angular directive provides functionality to handle hover menu behavior, allowing menus to open when hovered over and close when the mouse leaves.

[![npm version](https://badge.fury.io/js/ngx-mat-menu-hover.svg)](https://badge.fury.io/js/ngx-mat-menu-hover)

## Installation

    npm install mat-menu-hover@latest

Since the directive is marked as standalone you can directly import it into a module.

    import { Component } from  '@angular/core';
    import { HoverMenuDirective } from  'mat-menu-hover';
    
    @Component({
        imports: [HoverMenuDirective],
        selector: 'app-root',
    	...
   	})
   	export class AppComponent { }

## Usage

    <button mat-button [matMenuTriggerFor]="menu" matHoverMenu>Menu</button>
    <mat-menu #menu="matMenu">
    	<!-- Menu content goes here -->
    </mat-menu>

## Optional inputs/outputs
|Keyword     |Function                           |Note          |
|------------|-----------------------------------|--------------|
|[closeDelay]|Adds a delay before the menu closed|Default = 50ms|
|(opened)    |Emits if the menu is opened/closed |              |

## Known issues
- Currently, it is not possible to nest menus. It will only work with single-level mat-menus.

## License
This project is licensed under the MIT License - see the LICENSE file for details.