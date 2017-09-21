import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

 describe('App', () => {
     let component = null;
     beforeEach(() => {
        component = renderComponent(App);
     });

     it('shows a comment component', () => {
         expect(component.find('.CommentBox')).to.exist;
     });
     it('shows a comment list component', () => {
         expect(component.find('.CommentList')).to.exist;
     });
 });
