Feature: Testing Device API

  Scenario Outline: Create Device
    Given I want to create a device
    When I create a device
    Then I should get a response with status <code>
    And I should get a response with body

    Examples:
      | code |
      | 200  |

  Scenario Outline: Create Same Device
    Given I want to create a device
    When I create a device
    Then I should get a response with status <code>

    Examples:
      | code |
      | 409  |

  Scenario Outline: Get Devices
    Given I want to get all devices
    When I get all devices
    Then I should get a response with status <code>

    Examples:
      | code |
      | 200  |

  Scenario Outline: Get a Device
    Given I want to get the device with serialNumber <serialNumber>
    When I get a device
    Then I should get a response with status <code>
    And I should get a response with body

    Examples:
      | code | serialNumber |
      | 200  | "1"          |


  Scenario Outline: Get a Non-existing Device
    Given I want to get the device with serialNumber <serialNumber>
    When I get a device
    Then I should get a response with status <code>

    Examples:
      | code | serialNumber |
      | 404  | "2"          |
      | 404  | "abc"        |

  Scenario Outline: Update a device
    Given I want to update a device
    When I update a device
    Then I should get a response with status <code>
    And I should get an updated response with body

    Examples:
      | code |
      | 200  |

  Scenario Outline: Delete Device
    Given I want to delete the device with serialNumber <serialNumber>
    When I delete a device
    And I get a device
    Then I should get a response with status <code>

    Examples:
      | code | serialNumber |
      | 404  | "1"          |





