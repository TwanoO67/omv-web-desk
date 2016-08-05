/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { WindowService } from './window.service';

describe('Service: Window', () => {
  beforeEach(() => {
    addProviders([WindowService]);
  });

  it('should ...',
    inject([WindowService],
      (service: WindowService) => {
        expect(service).toBeTruthy();
      }));
});
