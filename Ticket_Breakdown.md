# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Implement Custom IDs for Facilities' Agents

Description:
Currently, the reports generated for client Facilities use internal database IDs for Agents. The goal of this ticket is to enable Facilities to save and use their own custom IDs for each Agent when generating reports. This will align the reporting system with Facilities' preferred identification method.

Assumptions:
    
    1 agent works in only 1 facility

Acceptance Criteria:

    Add a new field for custom IDs in the Agents table.
    Modify the user interface to allow Facilities to enter and save custom IDs for their Agents.
    Update the generateReport function to use custom IDs instead of internal database IDs when generating reports.
    Ensure that the custom IDs are correctly associated with the respective Agents and displayed in the generated reports.

Implementation Details:

    Database Changes:
        Add a new column named "custom_id" to the Agents table.
        Modify the database schema migration scripts to include the new column.

    User Interface Changes:
        Update the Agents management interface to include a field for entering custom IDs.
        Modify the form submission logic to save the custom ID in the Agents table.

    Backend Changes:
        Update the generateReport function to fetch the custom IDs from the Agents table instead of the internal database IDs.
        Update the report generation logic to use the custom IDs when generating reports.


### Ticket 2: Data Migration for Existing Agents' Custom IDs

Description:
To ensure a smooth transition to the new custom ID system, the existing Agents' custom IDs need to be migrated from the current system to the new system. This ticket involves updating the Agents table with the custom IDs provided by Facilities.

Acceptance Criteria:

    Create a script to migrate existing custom IDs to the new field in the Agents table.
    Run the migration script on the production database to update the custom IDs for all existing Agents.

Implementation Details:

    Write a data migration script that retrieves the existing custom IDs from the current system and updates the corresponding Agents' custom ID field in the database.
    Test the migration script on a staging environment (if exists) to ensure it updates the custom IDs correctly.
    Coordinate with the operations team (if exists) to schedule a maintenance window for running the migration script on the production database.


### Ticket 3: Reporting Metadata Enhancement

Description:
The reports generated for client Facilities currently include limited metadata about the Agents assigned to each shift. This ticket aims to enhance the reporting metadata by including additional information that will provide better insights to Facilities.

Acceptance Criteria:

    Identify the relevant additional metadata fields to be included in the reports including the custom ID.
    Modify the getShiftsByFacility function to fetch and include the additional metadata fields for each Agent assigned to a shift.
    Update the generateReport function to incorporate the new metadata fields into the generated reports.

Implementation Details:

    Identify the additional metadata fields required for reporting (e.g., Agent name, custom ID, contact information, shift start/end time, etc.).
    Modify the getShiftsByFacility function to join the necessary tables and retrieve the additional metadata fields for each Agent assigned to a shift.
    Update the generateReport function to include the new metadata fields in the generated reports.

Note: Depending on the complexity and number of metadata fields to be added, this ticket may need to be further broken down into multiple smaller tickets.
