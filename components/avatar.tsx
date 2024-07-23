import Image from "next/image";
import authorIcon from "../public/author.png";

export default function Avatar({ author }) {
  const isAuthorHaveFullName =
    author?.node?.firstName && author?.node?.lastName;
  const name = isAuthorHaveFullName
    ? `${author.node.firstName} ${author.node.lastName}`
    : author?.node?.name || null;

  return (
    <div className="flex items-center">
      <div className="p-2 rounded-full bg-white mr-2">
        <Image src={authorIcon} alt={name} height={32} width={32}  />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
