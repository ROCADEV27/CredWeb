import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterdetailComponent } from './masterdetail.component';

describe('MasterdetailComponent', () => {
  let component: MasterdetailComponent;
  let fixture: ComponentFixture<MasterdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
