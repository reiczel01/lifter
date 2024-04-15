import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Input, Button} from "@nextui-org/react";

export default function LogIn(){

    return(
        <Card className="">
            <CardHeader className="flex gap-4 w-full">
                <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md">Logowanie</p>
                    <p className="text-small text-default-500">LIFTER</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody className="items-center w-full">
                <Input
                    isRequired
                    type="email"
                    label="Email"
                    className="mt-4"
                />
                <Input
                    isRequired
                    type="password"
                    label="Hasło"
                    className="mt-2"
                />
                <Button color="primary" className="w-1/2 p-2 mt-3">Zaloguj się</Button>
            </CardBody>
            <Divider/>
            <CardFooter className="w-full">
                <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                >
                    Zarejestruj się.
                </Link>
            </CardFooter>
        </Card>
    );
}
