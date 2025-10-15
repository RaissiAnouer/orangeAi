terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group""orangeai"{
    name     = "orangeai"
    location = "West Europe"
}

resource "azurerm_virtual_network" "vnet"{
    name                = "exemple-network"
    resource_group_name = azurerm_resource_group.orangeai.name
    location            = azurerm_resource_group.orangeai.location
    address_space       = ["10.0.0.0/16"]
}

resource "azurerm_subnet" "subnet"{
  name                  = "subnet"
  resource_group_name   = azurerm_resource_group.orangeai.name
  virtual_network_name  = azurerm_virtual_network.orangeai.name
  address_prefixes      = ["10.0.1.0/24"]

}
resource "azurerm_network_security_group" "asg" {
  name                = "asg"
  location            = azurerm_resource_group.orangeai.location
  resource_group_name = azurerm_resource_group.orangeai.name

  security_rule {
    name                       = "test123"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "*"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

