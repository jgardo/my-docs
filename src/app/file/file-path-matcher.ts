import { Route, UrlSegment, UrlSegmentGroup } from '@angular/router';

export const filePathMatch = (segments: UrlSegment[], group: UrlSegmentGroup, route: Route) => {
    if (segments.length > 0 && segments[segments.length - 1].path.endsWith('-details')) {
        return {
            consumed: []
        };
    }
    return null;
};
