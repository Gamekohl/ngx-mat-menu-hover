# mat-menu-hover - An Angular Material directive
This Angular directive provides functionality to handle hover menu behavior, allowing menus to open when hovered over and close when the mouse leaves.

[![npm version](https://badge.fury.io/js/ngx-mat-menu-hover.svg)](https://badge.fury.io/js/ngx-mat-menu-hover)

## Installation

    npm install mat-menu-hover@latest

Since the directive is marked as standalone you can directly import it into a module.

    import { NgModule } from  '@angular/core';
    import { HoverMenuDirective } from  'mat-menu-hover';
    
    @NgModule({
    	declarations: [...],
    	imports: [
    		HoverMenuDirective
    	],
    	exports: [...]
   	})
   	export class AppModule { }

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
- Currently it is not possible to nest menus. It will only work with single-level mat-menus.

## If you like my work, you can
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/gamekohl)

## License
This project is licensed under the MIT License - see the LICENSE file for details.
