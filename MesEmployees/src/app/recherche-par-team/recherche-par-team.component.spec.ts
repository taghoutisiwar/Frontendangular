import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheParTeamComponent } from './recherche-par-team.component';

describe('RechercheParTeamComponent', () => {
  let component: RechercheParTeamComponent;
  let fixture: ComponentFixture<RechercheParTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheParTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheParTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});