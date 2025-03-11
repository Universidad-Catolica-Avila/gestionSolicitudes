import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobadoresComponent } from './aprobadores.component';

describe('AprobadoresComponent', () => {
  let component: AprobadoresComponent;
  let fixture: ComponentFixture<AprobadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprobadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
