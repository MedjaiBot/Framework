import 'reflect-metadata';
import { DateTimeFormatter } from '../DateTimeFormatter';

describe('DateTime formatter', () => {

    let dateTimeFormatter: DateTimeFormatter;

    beforeEach(() => {
        dateTimeFormatter = new DateTimeFormatter();
    });

    it('should format a timestamp', () => {
        const timestamp = new Date(2019, 9, 21, 0, 27, 30, 0);
        const formattedDateTime = dateTimeFormatter.format(timestamp);

        expect(formattedDateTime).toEqual('21.09.2019 00:27:30:000');
    });

});
