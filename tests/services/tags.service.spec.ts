import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tag } from '../../src/app/shared/models/interfaces/tag.interface';
import { environment } from '../../src/environments/environment';
import { TagsService } from '../../src/app/core/services/tags.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('TagsService', () => {
  let service: TagsService;
  let httpMock: HttpTestingController;

  const tags: Tag[] = [{
    belongToLabel: ['moda'],
    createdById: '5cde6a1561298b08dea45d58',
    label: 'Dr. Martens',
    type: 'shop',
    _id: '1',
    }
  ];

  const newTag: Tag = {
    belongToLabel: ['moda'],
    createdById: '5cde6a1561298b08dea45d58',
    label: 'Dr. Martens',
    type: 'shop',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]),
      ],
      providers: [TagsService]
    });
    service = TestBed.get(TagsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('TagsService should exist', () => {
    expect(service).toBeDefined();
  });

  it('should get all user tags', () => {
    service.getTags().subscribe((data: Tag[]) => {
      expect(data[0].label).toBe('Dr. Martens');
    });
    const req = httpMock.expectOne(`${environment.API_URL}/tags/userTags`);
    expect(req.request.method).toBe('GET');
    req.flush(tags);
  });
  //
  // it('should get default tags', () => {
  //   service.getBasicTags().subscribe((data: Tag[]) => {
  //     expect(data[0].label).toBe('Dr. Martens');
  //   });
  //   const req = httpMock.expectOne(`${environment.API_URL}/tags/basic`);
  //   expect(req.request.method).toBe('GET');
  //   req.flush(tags);
  // });

  it('should add new tag', () => {
    service.addTag(newTag).subscribe((data: Tag) => {
      expect(data.label).toBe('Dr. Martens');
    });
    const req = httpMock.expectOne(
      `${environment.API_URL}/tags/create`
    );
    expect(req.request.method).toBe('POST');
    req.flush(newTag);
  });

  it('should delete tag', () => {
    service.removeTag('1').subscribe((data: Tag) => {
      expect(data).toBe('1');
    });
    const req = httpMock.expectOne(
      `${environment.API_URL}/tags/delete/1`,
      'delete to api'
    );
    expect(req.request.method).toBe('DELETE');
    req.flush('1');
  });

  it('should delete tag', () => {
    service.removeTag('1').subscribe((data: Tag) => {
      expect(data).toBe('1');
    });
    const req = httpMock.expectOne(
      `${environment.API_URL}/tags/delete/1`,
      'delete to api'
    );
    expect(req.request.method).toBe('DELETE');
    req.flush('1');
  });

});
