import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegitarUsuarioComponent } from './regitar-usuario.component';

describe('RegitarUsuarioComponent', () => {
  let component: RegitarUsuarioComponent;
  let fixture: ComponentFixture<RegitarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegitarUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegitarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
