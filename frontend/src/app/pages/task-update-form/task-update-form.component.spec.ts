import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasktaskEditComponent } from './task-update-form.component';

describe('TaskUpdateFormComponent', () => {
  let component: TasktaskEditComponent;
  let fixture: ComponentFixture<TasktaskEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasktaskEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasktaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
