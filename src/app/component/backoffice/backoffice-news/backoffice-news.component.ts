import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth/auth.service";
import {Router} from "@angular/router";
import {NewsService} from "../../../service/news.service";
import {News} from "../../../model/news";
import {NgForm} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-backoffice-news',
  templateUrl: './backoffice-news.component.html',
  styleUrls: ['./backoffice-news.component.css']
})
export class BackofficeNewsComponent implements OnInit {

  public news:News[];
  private closeResult: string;

  constructor(public authService: AuthService, private route: Router, public newsService: NewsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    if ((this.authService.adminToken == null || this.authService.adminToken == 'null')) {
      this.route.navigate(['/backoffice/login']);
    }

    this.newsService.findAllNews().subscribe({
      next: news => {
        this.news = news;
      },
      error: err => {
        alert("Cant connect to server");
      }
    })
  }

  saveNewNews(itemForm: NgForm) {
    let news = new News();

    news.title = itemForm.value.title;
    news.source = itemForm.value.source;
    news.description = itemForm.value.description;
    news.active = itemForm.value.active;
    news.url = itemForm.value.url;
    this.newsService.saveNews(news);
    window.location.reload()
  }

  saveUser(itemForm: NgForm, id: number) {
    let title = itemForm.value.title;
    let source = itemForm.value.source;
    let description = itemForm.value.description;
    let active = itemForm.value.active;
    let url = itemForm.value.url;

    this.news.forEach(n => {
      if (n.id == id) {
        n.title = title;
        n.source = source;
        n.description = description;
        n.active = active;
        n.url = url;
        this.newsService.saveNews(n);
        return;
      }
    })
    window.location.reload()
  }

  sendNews(id: number) {
    this.newsService.sendNews(id);
    window.location.reload()
  }


  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
