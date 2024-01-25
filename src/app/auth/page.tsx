import { Box, Card, CardHeader, CardBody } from "@chakra-ui/react";
import { Auth } from "@saas-ui/auth";

const getAbsoluteUrl = (path: string) => {
  if (typeof window === "undefined") {
    return path;
  }
  return window.location.origin;
};

export default function AuthPage() {
  return (
    <Card>
      <CardHeader display="flex" alignItems="center" justifyContent="center">
        Logo
      </CardHeader>
      <CardBody>
        <Auth type="password" />
      </CardBody>
    </Card>
  );
}
