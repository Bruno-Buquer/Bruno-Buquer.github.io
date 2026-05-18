import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { ContactChannelCard } from "@/components/ui/ContactChannelCard";
import { contactChannels, homeTitles } from "@/data/home";

export function ContatoSection() {
  return (
    <section className="formacao" id="contato">
      <AnimatedTitle segments={homeTitles.contato} />

      <div className="container-cards">
        {contactChannels.map((channel) => (
          <ContactChannelCard
            key={channel.label}
            label={channel.label}
            heading={channel.heading}
            detail={channel.detail}
            actionHref={channel.actionHref}
            actionLabel={channel.actionLabel}
            external={channel.external}
          />
        ))}
      </div>
    </section>
  );
}
