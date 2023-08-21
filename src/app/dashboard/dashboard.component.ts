import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  data: any; 
  newPost: any = { title: '', body: '' };
  editPost: any = { id: '', title: '', body: '' };

  constructor(private authService: AuthService, private http: HttpClient) {}

  logout() {
    this.authService.logout();
  }

  getData() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    this.http.get(url).subscribe((res) => {
      this.data = res;
      console.log(this.data);
    });
  }
  ngOnInit() {
    this.getData()
  }
  deleteData(id: number) {
    const deleteUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
    this.http.delete(deleteUrl).subscribe(
      () => {
        console.log(`Deleted data with ID: ${id}`);
        // this.getData();
        this.data = this.data.filter((post: any) => post.id !== id);
      },
      (error) => {
        console.error(`Error deleting data with ID ${id}:`, error);
      }
    );
  }
  // editData(newPost:any) {
  //   this.editPost = { ...newPost }; 

  //   document.getElementById('title').value = newPost.title;

  //   const deleteUrl = `https://jsonplaceholder.typicode.com/posts/${newPost.id}`;
  //   this.http.delete(deleteUrl).subscribe(
  //     () => {
  //       console.log(`Deleted data with ID: ${newPost.id}`);
   
  //       // this.getData();
  //       this.data = this.data.filter((post: any) => post.id !== newPost.id);
  //     },
  //     (error) => {
  //       console.error(`Error deleting data with ID ${newPost.id}:`, error);
  //     }
  //   );
  // }
  editData(post: any) {
    this.editPost = { ...post }; 
  }

  postData(newPost:any) {
    this.http.post<any>('https://jsonplaceholder.typicode.com/posts', newPost).subscribe(data => {
      console.log('New post created:', data);
      // this.getData(); 
      this.data.push(data);
      this.newPost = { title: '', body: '' };
    });
  }

  updateData() {
  const updateUrl = `https://jsonplaceholder.typicode.com/posts/${this.editPost.id}`;
  this.http.put(updateUrl, this.editPost).subscribe(
    () => {
      console.log(`Updated data with ID: ${this.editPost.id}`);
      this.getData(); 
      this.editPost = { id: '', title: '', body: '' }; 
    },
    (error) => {
      console.error(`Error updating data with ID ${this.editPost.id}:`, error);
    }
  );
}
}
