import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractableGraphComponent } from './interactable-graph.component';

describe('InteractableGraphComponent', () => {
  let component: InteractableGraphComponent;
  let fixture: ComponentFixture<InteractableGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractableGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractableGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
