//for auto suggestion  in vsc
/// <reference types = "Cypress" />

// const { use } = require("chai");
// const { eq } = require("cypress/types/lodash");


//const dataJson = require('../../fixtures/createuser')
describe('Update user request', () => {
    let accesstoken = '85130be56615e01bceb70219f5c749914a42454db08b734250118e50e76f218c'
    let randomText = "";
    let testEmail = "";
    it('update user test', () => {

        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++) {
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
            testEmail = randomText + '@gmail.com'
        }

        cy.fixture('createuser').then((payload) => {


            //post call
            cy.request({

                method: 'POST',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'authorization': "Bearer " + accesstoken
                },
                body: { //body is json payload
                    "name": payload.name,//dataJson.name
                    "email": testEmail,
                    "gender": payload.gender,
                    "status": payload.status
                }


            }).then((res) => {
                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(201)
                expect(res.body.data).has.property('email', testEmail)
                expect(res.body.data).has.property('name', payload.name)
                expect(res.body.data).has.property('gender', payload.gender)
                expect(res.body.data).has.property('status', payload.status)
            }).then((res) => {
                const userID = res.body.data.id
                cy.log("user id = " + userID);

                //get call
                cy.request({
                    method: 'GET',
                    url: 'https://gorest.co.in/public/v1/users/' + userID,
                    headers: {
                        'authorization': "Bearer " + accesstoken
                    }

                }).then((res) => {
                    expect(res.status).to.eq(200)
                    expect(res.body.data).has.property('id', userID)
                    expect(res.body.data).has.property('email', testEmail)
                    expect(res.body.data).has.property('name', payload.name)
                    expect(res.body.data).has.property('gender', payload.gender)
                    expect(res.body.data).has.property('status', payload.status)

                })
            })

        }).then((res) => {
            const constantId = res.body.data.id
            cy.log("user id = " + constantId);
            //update data
            cy.fixture('updatefeatures').then((payload) => {


                //put call
                cy.request({

                    method: 'PUT',
                    url: 'https://gorest.co.in/public/v1/users/' + constantId,
                    headers: {
                        'authorization': "Bearer " + accesstoken
                    },
                    body: { //body is json payload
                        "id": constantId,
                        "name": payload.name,//dataJson.name
                        "email": payload.email,
                        "gender": payload.gender,
                        "status": payload.status
                    }


                }).then((res) => {
                    cy.log(JSON.stringify(res))
                    expect(res.status).to.eq(200)
                    expect(res.body.data).has.property('id', constantId)
                    expect(res.body.data).has.property('email', payload.email)
                    expect(res.body.data).has.property('name', payload.name)
                    expect(res.body.data).has.property('gender', payload.gender)
                    expect(res.body.data).has.property('status', payload.status)
                }).then((res) => {
                    const Id = res.body.data.id
                    cy.log("user id = " + Id);

                    //get call
                    cy.request({
                        method: 'GET',
                        url: 'https://gorest.co.in/public/v1/users/' + Id,
                        headers: {
                            'authorization': "Bearer " + accesstoken
                        }

                    }).then((res) => {
                        expect(res.status).to.eq(200)
                        expect(res.body.data).has.property('id', Id)
                        expect(res.body.data).has.property('email', payload.email)
                        expect(res.body.data).has.property('name', payload.name)
                        expect(res.body.data).has.property('gender', payload.gender)
                        expect(res.body.data).has.property('status', payload.status)

                    })
                })
            })

        })
    });
});