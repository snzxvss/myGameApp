import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameModePage } from './game-mode.page';

describe('GameModePage', () => {
  let component: GameModePage;
  let fixture: ComponentFixture<GameModePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GameModePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
