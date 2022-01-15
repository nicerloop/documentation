---
id: step_libraries
title: Step Libraries
sidebar_position: 4
---

# Serenity Step Libraries
In Serenity, tests are broken down into reusable steps. An important principle behind Serenity is the idea that it is easier to maintain a test that uses several layers of abstraction to hide the complexity behind different parts of a test.

In an automated acceptance test, test steps represent the level of abstraction between the code that interacts with your application (for example, Page Component Objects in an automated web test, which model parts of the user interface, or API endpoints for web services you need to interact with) and higher-level stories (sequences of more business-focused actions that illustrate how a given user story has been implemented). If your automated test is not UI-oriented (for example, if it calls a web service), steps orchestrate other more technical components such as REST clients. Steps can contain other steps, and are included in the Serenity reports. Whenever a UI step is executed, a screenshot is stored and displayed in the report.

## Breaking down tests into steps
Suppose we are testing a Frequent Flyer programme, and need to illustrate the following business rules:

- Members should start with Bronze status
- Members should earn Silver status after flying 10,000 km.

Each of these can be broken down further into business tasks and verifications. For example, the first rule could be broken into two steps:
- Create a new Frequent Flyer member
- Check that the member has a status of Bronze

And the second can be broken into three steps:
- Create a new Frequent Flyer member
- Make the member fly 10000 km
- Check that the member has a status of Silver

We could express these tests using Serenity in JUnit as follows:

```java
package flyer;

import net.serenitybdd.junit.runners.SerenityRunner;
import net.thucydides.core.annotations.Steps;
import org.junit.Test;
import org.junit.runner.RunWith;
import flyer.steps.TravellerEarningStatusPoints;

import static flyer.Status.Bronze;
import static flyer.Status.Silver;

/// [classbody]
@ExtendWith(SerenityJUnit5Extension.class)
public class WhenEarningFrequentFlyerStatus {

    @Steps
    TravellerEarningStatusPoints tracy;

    @Test
    public void members_should_start_with_Bronze_status() {
        // GIVEN
        tracy.joins_the_frequent_flyer_program();

        // THEN
        tracy.should_have_a_status_of(Bronze);
    }

    @Test
    public void earn_silver_after_10000_kilometers() {
        // GIVEN
        tracy.joins_the_frequent_flyer_program();

        // WHEN
        tracy.flies(10000);

        // THEN
        tracy.should_have_a_status_of(Silver);
    }
}
```

Notice how the second test reuses step methods used in the first to perform a slightly different test. This is a typical example of the way we reuse steps in similar tests, in order to avoid duplicated code and make the code easier to maintain.

## Implementing Step Libraries
The `TravellerEarningStatusPoints` class is what we call a step library. We use the `@Steps` class as shown above to indicate a step library in our test code: this annotation tells Serenity to instantiate and instrument this field, so that methods you call in this library also appear in the test reports, just like in the one you can see here:

earn silver after 10000 km
Step libraries contain the business tasks or actions that a user performs during a test. There are many ways to organise your step libraries, but a convenient way is to group methods in slices of business behaviour for a given type of user. In this case a traveller who is earning status points.

Notice that it was not necessary to explicitly instantiate the Steps class TravellerEarningStatusPoints. When you annotated a member variable of this class with the @Steps annotation, Serenity BDD will automatically instantiate it for you.

You should never create instances of step libraries using the new keyword, as Serenity will not be able to instrument the step library correctly, and the methods called will not appear in the reports.

Step methods are annotated with the @Step annotation:

<!-- TravellerEarningStatusPoints.java
package flyer.steps;

import flyer.FrequentFlyer;
import flyer.Status;
import net.thucydides.core.annotations.Step;

import static org.assertj.core.api.Assertions.assertThat;

/// [classbody]
/// [preamble]
public class TravellerEarningStatusPoints {

    private String actor;

    private FrequentFlyer frequentFlyer;

    /// [preamble]
    /// [joins]
    @Step("#actor joins the frequent flyer program")   
    public void joins_the_frequent_flyer_program() {
        frequentFlyer = FrequentFlyer.withInitialBalanceOf(0);
    }
    /// [joins]

    @Step("#actor flies {0} km")
    public void flies(int distance) {
        frequentFlyer.recordFlightDistanceInKilometers(distance);
    }

    @Step("#actor should have a status of {0}")
    public void should_have_a_status_of(Status expectedStatus) {
        assertThat(frequentFlyer.getStatus()).isEqualTo(expectedStatus);
    }

    @Step("#actor transfers {0} points to {1}")
    public void transfers_points(int points, TravellerEarningStatusPoints otherFrequentFlier) {
        // Left as an exercise
    }

    @Override
    public String toString() {
        return actor;
    }

    @Step("#actor should have {0} points")
    public void should_have_points(int expectedPoints) {
        // Left as an exercise
    }
}
/// [classbody]
Steps classes can extend any class, or none
If you include an actor field in your step library, Serenity will inject the name of the step.
The @Step annotation denotes a Serenity step method
The @Step can take a String value to override the default step name
{0} indicates the first parameter of the step method. #name indicates the name field of the step library.
One of the keys to writing good tests is getting the layers right. Test suites are more maintainable when they are organised in clear, well defined layers. This helps our brain concentrate on one thing at a time.

Step libraries and personas
Step libraries are often used to represent actors or persona who interact with the application. For example, the TravellerEarningStatusPoints step library we saw earlier represents how a Frequent Flyer member earns status points.

Methods that represent a business task or action (joins_the_frequent_flyer_program()), and that will appear in the reports as a separate step, are annotated with the @Step annotation.

TravellerEarningStatusPoints.java
package flyer.steps;

import flyer.FrequentFlyer;
import flyer.Status;
import net.thucydides.core.annotations.Step;

import static org.assertj.core.api.Assertions.assertThat;

/// [classbody]
/// [preamble]
public class TravellerEarningStatusPoints {

    private String actor;

    private FrequentFlyer frequentFlyer;

    /// [preamble]
    /// [joins]
    @Step("#actor joins the frequent flyer program")   
    public void joins_the_frequent_flyer_program() {
        frequentFlyer = FrequentFlyer.withInitialBalanceOf(0);
    }
    /// [joins]

    @Step("#actor flies {0} km")
    public void flies(int distance) {
        frequentFlyer.recordFlightDistanceInKilometers(distance);
    }

    @Step("#actor should have a status of {0}")
    public void should_have_a_status_of(Status expectedStatus) {
        assertThat(frequentFlyer.getStatus()).isEqualTo(expectedStatus);
    }

    @Step("#actor transfers {0} points to {1}")
    public void transfers_points(int points, TravellerEarningStatusPoints otherFrequentFlier) {
        // Left as an exercise
    }

    @Override
    public String toString() {
        return actor;
    }

    @Step("#actor should have {0} points")
    public void should_have_points(int expectedPoints) {
        // Left as an exercise
    }
}
/// [classbody]
Notice how the @Step attribute has a string value. This tells Serenity what to write in the reports when this step is executed. You don’t need a value (if you don’t have one, the name of the method will be used instead). But you can use this value to make your step names more meaningful.

If you add an actor field to your step library, Serenity will inject the name of the @Steps variable into this field. You can then refer to it in the @Step annotation using the # notation that we saw earlier:

@Step("#actor joins the frequent flyer program")
Suppose we declare a step library like this:

@Steps
TravellerEarningStatusPoints tracy;
In this case, the name "Tracy" would be injected into the actor field, and the step description would become "Tracy joins the frequent flyer program"

You can also provide a more detailed name in the @Steps annotation:

@Steps("Tracy Jones")
TravellerEarningStatusPoints tracy;
@Step methods can also take parameters, as we saw for the flies() and should_have_a_status_of() methods. You can refer to these in your step description using an indexed notation starting at zero: {0} for the first parameter, {1} for the second, and so on.

@Step("#actor flies {0} km")
public void flies(int distance) {...}
This step would appear in the Serenity reports as "Tracy flies 10000 km".

Using several step libraries to represent different actors
Sometimes we can use several step libraries of the same type to make our tests more readable. For example, the following test shows how point transfers between different travellers works.

TravellerEarningStatusPoints.java
package flyer;

import flyer.steps.TravellerEarningStatusPoints;
import net.serenitybdd.junit.runners.SerenityRunner;
import net.thucydides.core.annotations.Steps;
import org.junit.Test;
import org.junit.runner.RunWith;

import static flyer.Status.Bronze;
import static flyer.Status.Silver;

/// [classbody]
@RunWith(SerenityRunner.class)
public class WhenTransferringFrequentFlyerPoints {

    @Steps
    TravellerEarningStatusPoints tracy;

    @Steps
    TravellerEarningStatusPoints troy;

    @Test
    public void memberCanTransferPointsToAnotherMemberWithoutLosingStatus() {
        // GIVEN
        tracy.joins_the_frequent_flyer_program();
        troy.joins_the_frequent_flyer_program();

        // AND
        tracy.flies(20000);

        // WHEN
        tracy.transfers_points(15000, troy);

        // THEN
        troy.should_have_points(15000);

        // AND
        tracy.should_have_a_status_of(Silver);
    }
}
/// [classbody]
...
package flyer.steps;

import flyer.FrequentFlyer;
import flyer.Status;
import net.thucydides.core.annotations.Step;

import static org.assertj.core.api.Assertions.assertThat;

/// [classbody]
/// [preamble]
public class TravellerEarningStatusPoints {

    private String actor;

    private FrequentFlyer frequentFlyer;

    /// [preamble]
    /// [joins]
    @Step("#actor joins the frequent flyer program")   
    public void joins_the_frequent_flyer_program() {
        frequentFlyer = FrequentFlyer.withInitialBalanceOf(0);
    }
    /// [joins]

    @Step("#actor flies {0} km")
    public void flies(int distance) {
        frequentFlyer.recordFlightDistanceInKilometers(distance);
    }

    @Step("#actor should have a status of {0}")
    public void should_have_a_status_of(Status expectedStatus) {
        assertThat(frequentFlyer.getStatus()).isEqualTo(expectedStatus);
    }

    @Step("#actor transfers {0} points to {1}")
    public void transfers_points(int points, TravellerEarningStatusPoints otherFrequentFlier) {
        // Left as an exercise
    }

    @Override
    public String toString() {
        return actor;
    }

    @Step("#actor should have {0} points")
    public void should_have_points(int expectedPoints) {
        // Left as an exercise
    }
}
/// [classbody]
This would produce a report where both actors (Tracy and Troy) appear in different roles:

tracy and troy
Note that a more elegant way to do this is by using the Screenplay pattern, where each actor can have their own browser and abilities.

Shared Instances of Step Libraries
There are some cases where we want to reuse the same step library instance in different places across a test. For example, suppose we have a step library that interacts with a backend API, and that maintains some internal state and caching to improve performance. We might want to reuse a single instance of this step library, rather than having a separate instance for each variable.

We can do this by declaring the step library to be shared, like this:

@Steps(shared = true)
CustomerAPIStepLibrary customerAPI;
Now, any other step libraries of type CustomerAPIStepLibrary, that have the shared attribute set to true will refer to the same instance.

In older versions of Serenity, sharing instances was the default behaviour, and you used the uniqueInstance attribute to indicate that a step library should not be shared. If you need to force this behaviour for legacy test suites, set the step.creation.strategy property to legacy in your serenity.properties file:

step.creation.strategy = legacy
Sharing instances using the @Shared annotation
You can also use the @Shared annotation to share objects between steps and tasks in your test. The @Shared annotation is in practical terms a shortcut for @Steps(shared=true). This is handy in Screenplay tests, where the @Shared annotation reflects the intention more accurately than the @Steps annotation.

For example, suppose you have a Screenplay task that you use to set up some reference data that you want to share between steps. You could set them up in a special task called PrepareReferenceTestData:

givenThat(dana).wasAbleTo(PrepareReferenceTestData.inTheTestEnvironment());
The PrepareReferenceTestData class would prepare test data and place the data in a Java class (say ReferenceData):

public class PrepareReferenceTestData implements Task {
    public static Performable inTheTestEnvironment() {
            return instrumented(PrepareSomeCommonData.class);
    }

    @Shared
    ReferenceData referenceData;

    @Override
    public <T extends Actor> void performAs(T actor) {
        // Prepare reference data used in several tasks in a shared class
        referenceData = ...
    }
}
Any other Task, Interaction or Question class can then refer to the reference data, simply by declaring a shared field of type ReferenceData:

@Shared
ReferenceData referenceData; -->
