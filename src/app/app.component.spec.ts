import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MyApp } from './app.component';

describe('MyApp', () => {
  it('should create the app', async () => {
    await TestBed.configureTestingModule({
      imports: [MyApp],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(MyApp);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
