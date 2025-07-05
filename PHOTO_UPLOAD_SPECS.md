# Photo Upload Feature Specifications

## Progress Update (as of today)

### ✅ Accomplished
- Created and checked out a feature branch for photo upload
- Installed and configured Clerk authentication for Vite + React
- Added ClerkProvider to main.tsx and verified environment variable setup
- Added Clerk auth buttons (Sign In, Sign Up, User menu) to the app
- Debugged and fixed environment variable and CSS outline issues
- Confirmed landing page remains public and auth is only required for protected features

### ⏳ Next Steps
- Implement route protection for the upload page (only accessible when authenticated)
- Build the upload page and drag-and-drop upload component
- Connect upload logic to Supabase Storage
- Create database schema for user uploads
- Add upload counter and success confirmation
- Integrate analytics and navigation updates
- Polish error handling, mobile optimization, and testing

---

## Overview
Implement photo upload functionality for families to submit photos for manual coloring book generation. This feature will allow authenticated users to upload photos and track their submissions.

## Authentication
- **Provider**: Clerk Authentication
- **Flow**: Users must be authenticated before uploading photos
- **Integration**: Follow McKay's App Template best practices
- **Route Protection**: Use Clerk middleware to protect upload routes
- **Route Groups**: Organize with `(authenticated)` and `(unauthenticated)` groups

### Clerk Integration Patterns
- **ClerkProvider**: Wrap only authenticated routes, keep landing page public
- **Middleware**: Use route-based protection for upload functionality
- **Route Structure**: 
  - `/` - Public landing page (no auth required)
  - `/upload` - Protected photo upload page (auth required)
  - `/login` - Public auth routes
- **User Management**: Use Clerk's built-in user management
- **Session Handling**: Leverage Clerk's session management

## File Upload Requirements

### Technical Constraints
- **Upload Limit**: 1 file per upload session
- **File Types**: JPG, PNG, JPEG (based on Supabase technical constraints)
- **File Size**: Determined by Supabase storage limits
- **Interface**: Drag-and-drop upload component

### User Experience
- **Upload Flow**: 
  1. User must be logged in
  2. Drag-and-drop interface for file selection
  3. File validation (type, size)
  4. Upload progress indicator
  5. Success confirmation with "we'll process this manually" message
  6. Display counter of total images uploaded by user

### File Storage
- **Provider**: Supabase Storage
- **Organization**: By user ID structure (to be determined during implementation)
- **Retention**: Indefinite storage
- **Access**: Direct access from Supabase for manual processing

## Database Schema

### New Tables

#### `users` table
```sql
- id (UUID, primary key)
- clerk_user_id (text, unique) - Clerk user identifier
- email (text)
- name (text)
- created_at (timestamp)
- updated_at (timestamp)
```

#### `user_uploads` table
```sql
- id (UUID, primary key)
- user_id (UUID, foreign key to users table)
- original_filename (text)
- file_path (text - Supabase Storage path)
- file_size (integer)
- mime_type (text)
- upload_status (enum: 'uploaded', 'failed')
- created_at (timestamp)
- updated_at (timestamp)
```

## Supabase Storage Setup

### Storage Buckets
- `original-photos` - for uploaded photos
- `coloring-books` - for generated coloring book files (future use)

### Security Policies
- Row Level Security (RLS) enabled
- Users can only access their own uploads
- File access controlled by user permissions

## Frontend Components

### New Components to Create
1. **PhotoUploadSection.tsx** - Main upload interface
2. **DragDropUpload.tsx** - Reusable drag-and-drop component
3. **UploadProgress.tsx** - Progress indicator
4. **UploadSuccess.tsx** - Success confirmation with manual processing message
5. **UploadCounter.tsx** - Display total images uploaded by user
6. **AuthGuard.tsx** - Route protection component (following Clerk patterns)
7. **UserProfile.tsx** - User profile display component

### Integration Points
- Add upload link to existing navigation (only visible when authenticated)
- Integrate with Clerk authentication for protected routes
- Connect with existing analytics tracking
- Keep landing page completely public and unchanged

## User Flow

### Upload Process
1. User navigates to upload page from landing page
2. Authentication check (redirect to login if not authenticated)
3. After login, redirect back to upload page
4. Drag-and-drop interface presented
5. File validation on drop/selection
6. Upload to Supabase Storage
7. Database record creation
8. Success confirmation displayed
9. Upload counter updated

### Error Handling
- Network errors during upload
- File validation errors (type, size)
- Authentication errors
- User-friendly error messages with retry options

## Manual Processing Workflow

### Current Process (MVP)
- Admin accesses photos directly from Supabase Storage
- Manual processing of photos to coloring books
- Manual email notifications to users
- No automated status tracking

### Future Enhancements (Out of Scope for MVP)
- Admin dashboard for processing management
- Automated status updates
- Self-service dashboard for users
- Email automation
- Payment integration

## Technical Implementation

### File Upload Handling
- Client-side validation before upload
- Progress tracking during upload
- Error handling and retry logic
- Optimistic UI updates

### State Management
- React state for upload progress
- Clerk user state integration
- Local storage for user preferences

### Performance Considerations
- Image compression before upload (if needed)
- Efficient file handling
- Responsive design for mobile uploads

## Security & Privacy

### Current Implementation
- No content filtering
- No watermarks
- Terms of service/privacy policy updates deferred
- Basic file access controls via RLS

### Future Considerations
- Content moderation
- Terms of service updates
- Privacy policy updates
- File encryption (if needed)

## Testing Strategy

### Unit Tests
- Upload component functionality
- File validation logic
- Error handling

### Integration Tests
- End-to-end upload flow
- Authentication integration
- Database operations

### User Testing
- Drag-and-drop functionality
- Mobile responsiveness
- Error scenarios

## Deployment Considerations

### Environment Variables
- **Clerk Configuration**:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
  - `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login`
  - `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup`
- **Supabase Configuration**:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- **Storage bucket names**

### Monitoring
- Upload success/failure rates
- File size distribution
- User engagement metrics

## Future Enhancements (Post-MVP)

### Self-Service Features
- User dashboard for viewing uploads
- Download completed coloring books
- Upload history

### Automation
- Email notifications
- Status tracking
- Payment processing

### Admin Features
- Processing queue management
- User management
- Analytics dashboard

## Success Metrics

### Technical Metrics
- Upload success rate
- Average upload time
- Error rate by type

### User Metrics
- Upload completion rate
- User engagement
- Return user rate

---

## Implementation Phases

### Phase 1: Foundation
- Set up Clerk authentication for protected routes only
- Create database schema
- Configure Supabase storage
- Set up route protection for upload functionality
- Keep landing page public and unchanged

### Phase 2: Core Upload
- Build drag-and-drop component
- Implement file upload logic
- Add success/error handling

### Phase 3: Integration
- Connect with existing app
- Add navigation
- Integrate analytics

### Phase 4: Polish
- Error handling improvements
- Mobile optimization
- Testing and bug fixes 