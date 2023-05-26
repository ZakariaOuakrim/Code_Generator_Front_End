import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  username!:string;
  view:HTMLElement[]= Array.from(document.querySelectorAll('.image'));

  ngOnInit(): void {
    this.username =sessionStorage.getItem('username')! ;  
    console.log("username is "+this.username);
    this.view.forEach(element => {
      this.observer.observe(element);
    });
    
  }
   observer = new IntersectionObserver(entries => {
    entries.map(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('image-animation');
      }
    });
  });



}
