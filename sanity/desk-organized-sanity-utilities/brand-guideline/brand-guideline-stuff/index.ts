import brandGuidelineDocuments from './documents';
import brandGuidelineObjects from './objects';

// Objects must be registered before documents that reference them
export default [...brandGuidelineObjects, ...brandGuidelineDocuments];



