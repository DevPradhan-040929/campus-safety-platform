/**
 * This script demonstrates the full workflow of the Campus Safety Backend automatically.
 * It ensures the server is running, then executes a series of API calls simulating Users and Admins.
 */

const BASE_URL = 'http://localhost:5005/api';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runDemo() {
    console.log('🎓 Starting Campus Safety Platform Demonstration...\n');

    // 1. Create an Admin User
    console.log('=> 1. Registering an Admin User...');
    const adminEmail = `admin_${Date.now()}@campus.edu`;
    const adminPassword = 'securepassword';
    const adminRes = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Campus Police',
            email: adminEmail,
            password: adminPassword,
            role: 'Admin'
        })
    });
    const adminData = await adminRes.json();
    console.log(`✅ Admin Registered! ID: ${adminData._id}, Token: [HIDDEN]`);
    console.log(`🔑 Login Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}\n`);
    const adminToken = adminData.token;

    // 2. Create a Student User
    console.log('=> 2. Registering a Student User...');
    const studentEmail = `student_${Date.now()}@campus.edu`;
    const studentPassword = 'studentpassword';
    const studentRes = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Alex Johnson',
            email: studentEmail,
            password: studentPassword,
            role: 'Student'
        })
    });
    const studentData = await studentRes.json();
    console.log(`✅ Student Registered! ID: ${studentData._id}`);
    console.log(`🔑 Login Email: ${studentEmail}`);
    console.log(`🔑 Password: ${studentPassword}\n`);
    const studentToken = studentData.token;

    // 3. Student Creates an Incident
    console.log('=> 3. Student reporting an incident (Broken lock in dorm)...');
    const incidentRes = await fetch(`${BASE_URL}/incidents`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${studentToken}`
        },
        body: JSON.stringify({
            title: 'Broken Dorm Room Lock',
            description: 'The lock on door 402 is completely jammed and won\'t open.',
            location: 'Tower B, 4th Floor'
        })
    });
    const incidentData = await incidentRes.json();
    console.log(`✅ Incident Created! ID: ${incidentData._id}, Status: ${incidentData.status}\n`);
    const incidentId = incidentData._id;

    // 4. Admin Checks Notifications (Should see the new incident)
    console.log('=> 4. Admin checking their notifications...');
    const adminNotifRes = await fetch(`${BASE_URL}/notifications`, {
        headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const adminNotifs = await adminNotifRes.json();
    console.log(`📬 Admin Notifications (${adminNotifs.length}):`);
    console.log(`   - "${adminNotifs[0].message}"\n`);

    // 5. Admin Updates the Incident Status to "In Progress"
    console.log('=> 5. Admin responding to the incident and updating status...');
    const updateRes = await fetch(`${BASE_URL}/incidents/${incidentId}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status: 'In Progress' })
    });
    const updatedIncident = await updateRes.json();
    console.log(`✅ Incident Status updated to: ${updatedIncident.status}\n`);

    // 6. Student Checks Notifications (Should see the status update)
    console.log('=> 6. Student checking their notifications for updates...');
    const studentNotifRes = await fetch(`${BASE_URL}/notifications`, {
        headers: { 'Authorization': `Bearer ${studentToken}` }
    });
    const studentNotifs = await studentNotifRes.json();
    console.log(`📬 Student Notifications (${studentNotifs.length}):`);
    console.log(`   - "${studentNotifs[0].message}"\n`);

    console.log('🎉 Demonstration Complete! The backend system is fully operational.');
}

// Give the server a few seconds to boot if they just ran 'npm run dev' and 'node demo.js' closely together.
console.log('Waiting to ensure server is listening on port 5005...');
sleep(2000).then(() => {
    runDemo().catch(err => {
        console.error('❌ Demo Error! Make sure your server is running via `npm run dev` in another terminal.', err.message);
    });
});
