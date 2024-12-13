import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = new FormBuilder();
  form = this.fb.group({
    cpf: ['', Validators.required],
  });

  constructor(private router: Router, private storage: StorageService) {}

  onSubmit() {
    this.storage.set('cpf', this.form.value.cpf).subscribe({
      next: () => {
        this.router.navigate(['/'], {
          replaceUrl: true,
        });
      },
    });
  }
}
