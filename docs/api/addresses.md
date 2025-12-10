# Address Management API

This document outlines the API endpoints for managing user addresses.

## Get All Addresses

- **URL**: `/api/user/addresses`
- **Method**: `GET`
- **Auth Required**: Yes (Bearer Token)
- **Success Response**: `200 OK` with an array of address objects.

## Create New Address

- **URL**: `/api/user/addresses`
- **Method**: `POST`
- **Auth Required**: Yes (Bearer Token)
- **Body**: Address object
- **Success Response**: `201 Created` with the new address object.

## Update Address

- **URL**: `/api/user/addresses/:addressId`
- **Method**: `PUT`
- **Auth Required**: Yes (Bearer Token)
- **Body**: Address object
- **Success Response**: `200 OK` with the updated address object.

## Delete Address

- **URL**: `/api/user/addresses/:addressId`
- **Method**: `DELETE`
- **Auth Required**: Yes (Bearer Token)
- **Success Response**: `200 OK` with a success message.
